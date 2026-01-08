// import React, { useEffect } from 'react';
// import { Text, View } from 'react-native';

// const WebSocketExample = () => {
//   useEffect(() => {
//     // Replace with your own server address (use your local IP for development)
//     const uri = "ws://antone-logomachic-marcia.ngrok-free.dev/ws/rewards/stamp_record/123/";    
//     const ws = new WebSocket(uri);

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//       // You can send messages after the connection is open
//       ws.send(JSON.stringify({ message: 'Hello Server!' }));
//     };

//     ws.onmessage = (event) => {
//       console.log('Received message:', event.data);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Checking WebSocket connection...</Text>
//     </View>
//   );
// };

// export default WebSocketExample;
