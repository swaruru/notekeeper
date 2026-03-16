import React from 'react';

export default function WalletConnect({ address, isConnected, isConnecting, error, connect, disconnect }) {
  if (isConnected && address) {
    const truncated = `${address.slice(0, 4)}…${address.slice(-4)}`;
    return (
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border-2 border-green-300 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse ring-2 ring-green-200" />
          <span className="font-mono text-sm font-bold text-dreamy-text" title={address}>{truncated}</span>
        </div>
        <button 
          className="px-4 py-2 text-sm font-bold text-dreamy-text bg-white/50 hover:bg-white hover:text-red-500 border-2 border-window-border hover:border-red-300 rounded-full transition-all" 
          onClick={disconnect}
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {error && <span className="text-xs font-bold text-red-500">{error}</span>}
      <button 
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-dreamy-purple to-dreamy-pink text-white font-bold rounded-full border-2 border-dreamy-purple shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
        onClick={connect} 
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Connecting…
          </>
        ) : (
          <>✨ Connect Wallet</>
        )}
      </button>
    </div>
  );
}
