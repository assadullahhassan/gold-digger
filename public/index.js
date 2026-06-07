console.log("Hello from the client!")
const priceInfo = document.querySelector('.price-info-container')

// try {
//   const data = await fetch("/api", { method: "GET" })
//   const response = await data.json()
//   console.log('from api',response)
//   if (response.price) {
//     priceInfo.innerHTML = `
//           <p>£<span id="price-display" class="price" aria-live="assertive">${response.price.toFixed(2)}</span> / Oz*</p>
//             <p id="connection-status" class="status" aria-live="polite">Live Price 🟢</p>`
//   }
// } catch (err) {
//   console.log('Error:', err)
// }
const eventSource = new EventSource('/api');

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received price update:', data.price);
    if(data.price === null) {
       priceInfo.innerHTML = `
        <p>£<span id="price-display" class="price" aria-live="assertive">----.--</span> / Oz*</p>
        <p id="connection-status" class="status" aria-live="polite">Disconnected 🔴</p>
    `;
    } else {
        priceInfo.innerHTML = `
        <p>£<span id="price-display" class="price" aria-live="assertive">${data.price.toFixed(2)}</span> / Oz*</p>
        <p id="connection-status" class="status" aria-live="polite">Live Price 🟢</p>
    `;
    }
    
};

eventSource.onerror = function() {
    console.error('Error with SSE connection');
    priceInfo.innerHTML = `
        <p>£<span id="price-display" class="price" aria-live="assertive">----.--</span> / Oz*</p>
        <p id="connection-status" class="status" aria-live="polite">Disconnected 🔴</p>
    `;
}