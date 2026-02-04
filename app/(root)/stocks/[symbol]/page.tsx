'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import TradingViewWidget from '@/components/TradingViewWidget'
import WatchlistButton from '@/components/WatchlistButton'
import { WatchlistItem } from '@/database/models/watchlist.model'
import { getStocksDetails } from '@/lib/actions/finnhub.actions'
import { getUserWatchlist } from '@/lib/actions/watchlist.actions'
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from '@/lib/constants'

const page = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
}

const section = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function StockDetails() {
  const { symbol } = useParams<{ symbol: string }>()
  const stockSymbol = symbol.toUpperCase()

  const [stockData, setStockData] = useState<any>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [loading, setLoading] = useState(true)

  const scriptUrl =
    'https://s3.tradingview.com/external-embedding/embed-widget-'

  useEffect(() => {
    const loadData = async () => {
      const data = await getStocksDetails(stockSymbol)
      const watchlist = await getUserWatchlist()

      if (!data) return notFound()

      const exists = watchlist.some(
        (item: WatchlistItem) => item.symbol === stockSymbol
      )

      setStockData(data)
      setIsInWatchlist(exists)
      setLoading(false)
    }

    loadData()
  }, [stockSymbol])

  if (loading) return null

  return (
    <motion.main
      variants={page}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background px-6 py-12"
    >
      <motion.section
        variants={section}
        className="mx-auto max-w-screen-2xl space-y-10"
      >
        <motion.div variants={card} className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {stockSymbol} Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time charts • Financials • Technical analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <motion.div variants={section} className="flex flex-col gap-8">
            <motion.div variants={card} className="card">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}symbol-info.js`}
                config={SYMBOL_INFO_WIDGET_CONFIG(stockSymbol)}
                height={170}
              />
            </motion.div>

            <motion.div variants={card} className="card">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}advanced-chart.js`}
                config={CANDLE_CHART_WIDGET_CONFIG(stockSymbol)}
                height={600}
              />
            </motion.div>

            <motion.div variants={card} className="card">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}advanced-chart.js`}
                config={BASELINE_WIDGET_CONFIG(stockSymbol)}
                height={600}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={section} className="flex flex-col gap-8">
            <motion.div
              variants={card}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <WatchlistButton
                symbol={stockSymbol}
                company={stockData.company}
                isInWatchlist={isInWatchlist}
                type="button"
              />
            </motion.div>

            <motion.div variants={card} className="card">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}technical-analysis.js`}
                config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(stockSymbol)}
                height={400}
              />
            </motion.div>

            <motion.div variants={card} className="card">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}company-profile.js`}
                config={COMPANY_PROFILE_WIDGET_CONFIG(stockSymbol)}
                height={440}
              />
            </motion.div>

            <motion.div variants={card} className="card">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}financials.js`}
                config={COMPANY_FINANCIALS_WIDGET_CONFIG(stockSymbol)}
                height={464}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.main>
  )
}
