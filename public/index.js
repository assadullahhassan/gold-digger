console.log("Hello from the client!")
const priceInfo = document.querySelector('.price-info-container')

try {
  const data = await fetch("/api", { method: "GET" })
  const response = await data.json()
  console.log('from api',response)
  if (response.price) {
    priceInfo.innerHTML = `
          <p>£<span id="price-display" class="price" aria-live="assertive">${response.price.toFixed(2)}</span> / Oz*</p>
            <p id="connection-status" class="status" aria-live="polite">Live Price 🟢</p>`
  }
} catch (err) {
  console.log('Error:', err)
}