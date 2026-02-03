'use client'
import { motion } from 'framer-motion'
import TradingViewWidget from '@/components/TradingViewWidget'
import {
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
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

function Home() {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`

  return (
    <motion.main
      variants={page}
      initial="hidden"
      animate="show"
      className="min-h-screen bg-background px-6 py-12"
    >
      <motion.section
        variants={section}
        className="mx-auto max-w-screen-2xl space-y-14"
      >
        <motion.div variants={card} className="space-y-1">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Zarion Market Intelligence
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time global markets • Institutional-grade analytics
          </p>
        </motion.div>

        <motion.div
          variants={section}
          className="grid gap-8 xl:grid-cols-3"
        >
          <motion.div
            variants={card}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-2xl"
          >
            <TradingViewWidget
              title="Market Overview"
              scriptUrl={`${scriptUrl}market-overview.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              height={600}
            />
          </motion.div>

          <motion.div
            variants={card}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-2xl xl:col-span-2"
          >
            <TradingViewWidget
              title="Stock Heatmap"
              scriptUrl={`${scriptUrl}stock-heatmap.js`}
              config={MARKET_OVERVIEW_WIDGET_CONFIG}
              height={600}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={section}
          className="grid gap-8 xl:grid-cols-3"
        >
          <motion.div
            variants={card}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-2xl"
          >
            <TradingViewWidget
              scriptUrl={`${scriptUrl}timeline.js`}
              config={TOP_STORIES_WIDGET_CONFIG}
              height={600}
            />
          </motion.div>

          <motion.div
            variants={card}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-2xl xl:col-span-2"
          >
            <TradingViewWidget
              scriptUrl={`${scriptUrl}market-quotes.js`}
              config={MARKET_DATA_WIDGET_CONFIG}
              height={600}
            />
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.main>
  )
}

export default Home
