import { useEffect, useState } from 'react'
import { useToysState } from '../customHooks/loadToys'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PercentIcon from '@mui/icons-material/Percent'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import { ToyChart } from '../cmps/ToyChart'
import { Doughnut, PolarArea } from 'react-chartjs-2'

export function ToyDashboard() {
  const toys = useToysState()
  const [statsMap, setStatsMap] = useState({})

  useEffect(() => {
    setStatsMap({
      avgPrice: getAvgToysPrice(),
      total: toys.length,
      inStock: getToysInStock(),
      labelsMap: getToysPerLabel(),
      avgPricePerCat: getToysAvgPricePerLabel(),
    })

    getAvgToysPrice()
  }, [toys])
  console.log('statsMap:', statsMap)
  function getToysInStock() {
    if (!toys.length) return
    let inStock =
      toys.reduce((acc, toy) => {
        if (toy.inStock) acc++
        return acc
      }, 0) / toys.length
    const toPrecent = inStock * 100
    return toPrecent.toFixed()
  }

  function getAvgToysPrice() {
    if (!toys.length) return
    let avgPrice =
      toys.reduce((acc, toy) => {
        return acc + toy.price
      }, 0) / toys.length

    return avgPrice.toFixed()
  }

  function getToysAvgPricePerLabel() {
    const toysPerLabel = getToysPerLabel()
    const sumPerLabel = toys.reduce((acc, toy) => {
      if (!toy.labels || !toy.labels.length) return acc
      toy.labels.forEach((l) => (acc[l] ? (acc[l] += toy.price) : (acc[l] = toy.price)))
      return acc
    }, {})
    let avgsPrices = {}
    for (const label in toysPerLabel) {
      for (const l in sumPerLabel) {
        if (label === l) avgsPrices[label] = +(sumPerLabel[l] / toysPerLabel[label]).toFixed()
      }
    }
    return avgsPrices
  }

  function getToysPerLabel() {
    return toys.reduce((acc, toy) => {
      if (!toy.labels || !toy.labels.length) return acc
      toy.labels.forEach((l) => (acc[l] ? acc[l]++ : (acc[l] = 1)))
      return acc
    }, {})
  }

  console.log('toys:', toys)
  if (!toys || !toys.length) return <section>Loaadin...</section>
  return (
    <section className='toy-dashboard main-layout'>
      <div className='main-container'>
        <div className='stat-boxes'>
          <div className='icon-box stats'>
            <div className='text'>
              <h4>Avrage toy Price</h4>
              <h3>${statsMap.avgPrice}</h3>
              <p>10% Increment</p>
            </div>
            <div className='icon'>
              <CurrencyExchangeIcon fontSize='inherit' />
            </div>
          </div>
          <div className='icon-box stats'>
            <div className='text'>
              <h4>Total toys</h4>
              <h3>{statsMap.total}</h3>
              <p>17% Increment</p>
            </div>
            <div className='icon'>
              <SmartToyIcon fontSize='inherit' />
            </div>
          </div>
          <div className='icon-box stats'>
            <div className='text'>
              <h4>Total toys in stock</h4>
              <h3>{statsMap.inStock}%</h3>
              <p>7.8% Increment</p>
            </div>
            <div className='icon'>
              <PercentIcon fontSize='inherit' />
            </div>
          </div>
        </div>
        <div className='charts-container flex'>
          {statsMap.labelsMap && (
            <ToyChart
              label={'Number of toys'}
              chartType={'Doughnut'}
              labelsMap={statsMap.labelsMap}
            />
          )}
          {statsMap.avgPricePerCat && (
            <ToyChart
              label={'Avrage toy price'}
              chartType={'PolarArea'}
              labelsMap={statsMap.avgPricePerCat}
            />
          )}
        </div>
      </div>
    </section>
  )
}
