import { EventEmitter } from 'events';

class LocalNetworkService extends EventEmitter {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private isInitialized: boolean = false;

  constructor() {
    super();
  }

  initializePeerConnection() {
    if (typeof window !== 'undefined' && !this.isInitialized) {
      this.peerConnection = new window.RTCPeerConnection();
      this.dataChannel = this.peerConnection.createDataChannel('airdropChannel');

      this.dataChannel.onopen = () => {
        console.log('Data channel is open');
        this.isInitialized = true;
      };

      this.dataChannel.onmessage = (event) => {
        this.emit('message', JSON.parse(event.data));
      };

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('New ICE candidate:', event.candidate);
        }
      };
    }
  }

  private sendData(data: any) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(data));
    } else {
      console.warn('Data channel is not open. Message not sent.');
    }
  }

  broadcastWalletAddress(address: string) {
    this.sendData({ type: 'walletAddress', address });
  }

  broadcastAirdrop(airdropData: any) {
    this.sendData({ type: 'airdrop', data: airdropData });
  }

  startSearching() {
    console.log('Searching for peers on the local network...');
    // Implement peer discovery logic here
  }
}

export const localNetworkService = new LocalNetworkService();