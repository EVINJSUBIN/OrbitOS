import { useState, useEffect } from 'react'

export default function ISSTracker() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchISS = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchISS()
    const interval = setInterval(fetchISS, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center font-mono" style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#00fa9a' }}>
      <h2 className="text-xl font-bold mb-4 text-[#00d2ff]">🛰️ ISS Live Telemetry</h2>
      
      {error && <div className="text-red-500 mb-4">Error connecting to satellite API.</div>}
      
      {loading && !data && (
        <div className="mb-4">
          Establishing uplink...<br/><span className="text-2xl animate-pulse">⏳</span>
        </div>
      )}

      {data && (
        <div className="mb-6 space-y-2 text-lg">
          <div>LAT: {data.latitude.toFixed(4)}°</div>
          <div>LNG: {data.longitude.toFixed(4)}°</div>
          <div className="text-[#ff4757] mt-4">ALT: {data.altitude.toFixed(2)} km</div>
          <div className="text-[#ff4757]">VEL: {data.velocity.toFixed(2)} km/h</div>
        </div>
      )}

      <button 
        onClick={fetchISS}
        className="px-4 py-2 mt-2 bg-blue-500/20 border border-blue-400 rounded text-white hover:bg-blue-500/40 transition-colors cursor-pointer"
      >
        Sync Coordinates
      </button>
    </div>
  )
}
