export default function PhoneMockup() {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-50 blur-md"></div>
        <div className="relative z-10 bg-black rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
          <div className="p-4">
            <div className="flex items-center">
              <div className="text-white font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Toka</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-white font-medium">Trading</div>
              <div className="flex items-center mt-2 text-sm text-gray-300">
                <span>BTC/USD</span>
                <span className="ml-2">↓</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-white font-medium">Order book</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="text-gray-400">12.345.6700</div>
                <div className="text-green-500">0.0800</div>
                <div className="text-gray-400">27.35</div>
  
                <div className="text-gray-400">12.344.8500</div>
                <div className="text-green-500">0.0019</div>
                <div className="text-gray-400">26.81</div>
  
                <div className="text-gray-400">12.342.4500</div>
                <div className="text-green-500">0.1600</div>
                <div className="text-gray-400">25.44</div>
  
                <div className="text-gray-400">12.342.7777</div>
                <div className="text-green-500">0.1600</div>
                <div className="text-gray-400">24.92</div>
  
                <div className="text-gray-400">12.332.1900</div>
                <div className="text-green-500">4.4500</div>
                <div className="text-gray-400">24.51</div>
  
                <div className="text-gray-400">12.331.7600</div>
                <div className="text-green-500">0.0222</div>
                <div className="text-gray-400">23.44</div>
  
                <div className="text-gray-400">12.331.4500</div>
                <div className="text-green-500">4.0000</div>
                <div className="text-gray-400">22.17</div>
  
                <div className="text-gray-400">12.330.6400</div>
                <div className="text-green-500">0.0302</div>
                <div className="text-gray-400">21.12</div>
  
                <div className="text-gray-400">12.330.5700</div>
                <div className="text-green-500">2.0519</div>
                <div className="text-gray-400">20.11</div>
  
                <div className="text-gray-400">12.329.1900</div>
                <div className="text-green-500">0.1600</div>
                <div className="text-gray-400">19.32</div>
  
                <div className="text-gray-400">12.329.1900</div>
                <div className="text-green-500">0.5000</div>
                <div className="text-gray-400">18.93</div>
  
                <div className="text-gray-400">12.328.1900</div>
                <div className="text-green-500">0.0902</div>
                <div className="text-gray-400">17.21</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  