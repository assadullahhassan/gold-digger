console.log("Hello from the client!")

try {
  const data = await fetch("/api")
  const response = await data.json()
  console.log('from api',response)
} catch (err) {
  console.log('Error:', err)
}