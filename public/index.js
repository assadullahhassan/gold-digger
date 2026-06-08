console.log("Hello from the client!")
const priceInfo = document.querySelector('.price-info-container')
const investmentForm = document.getElementById('investment-form')
const outputDialog = document.querySelector('.outputs')
const closeBtn = outputDialog.querySelector('.close-btn')
let currentPrice = null;

closeBtn.addEventListener('click', () => {
    outputDialog.close();
})
const eventSource = new EventSource('/api');

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    currentPrice = data.price;
    console.log('Received price update:', data.price);
    if(data.price === null) {
       priceInfo.innerHTML = `
        <p>£<span id="price-display" class="price" aria-live="assertive">----.--</span> / Oz*</p>
        <p id="connection-status" class="status" aria-live="polite">Disconnected 🔴</p>
    `;
    } else if(data.price === undefined) {
         priceInfo.innerHTML = `
        <p>£<span id="price-display" class="price" aria-live="assertive">----.--</span> / Oz*</p>
        <p id="connection-status" class="status" aria-live="polite">Disconnected 🔴</p>
    `;
    } 
    else {
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

investmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('investment-amount').value;
    console.log('Investment amount:', amount);
    const ounces = amount / currentPrice;
    console.log('Ounces to buy:', ounces);
    const summaryText = `You just bought ${ounces.toFixed(2)} ounces (ozt) for £${amount}. You will receive documentation shortly.`;
    document.getElementById('investment-summary').textContent = summaryText;

    try {
        const response = await fetch('/api/invest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: parseFloat(amount),
                price: currentPrice,
                ounces: ounces,
                date: new Date()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit investment');
        }

        outputDialog.showModal();
    } catch (error) {
        console.error('Error submitting investment:', error);
    }
})