const fs = require("fs");
const http = require("http");
const path = require("path");

function checkFolderExists(folderName) {
  const folderPath = path.join(__dirname, folderName);
  return fs.existsSync(folderPath);
}

// 2)
const server = http.createServer((req, res) => {
  if (req.url === "/data") {
    if (fs.existsSync("data.json")) {
      const data = fs.readFileSync("data.json");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "data.json not found" }));
    }
  }
  // 3)
  else if (req.url === "/random") {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ random: randomNum }));
  }
  // 4)
  else if (req.url === "/html") {
    const htmlContent = `
      <html>
        <body>
          <table border="1">
            <tr><th>Name</th><th>Age</th></tr>
            <tr><td>John Doe</td><td>30</td></tr>
            <tr><td>Jane Smith</td><td>25</td></tr>
          </table>
        </body>
      </html>`;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  }
  // 5)
  else if (req.url === "/current-time") {
    const currentTime = new Date().toISOString();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ time: currentTime }));
  }
  // 6)
  else if (req.url === "/api") {
    const apiData = [
      { id: 1, name: "Alice", role: "Admin" },
      { id: 2, name: "Bob", role: "User" },
      { id: 3, name: "Charlie", role: "Guest" },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(apiData));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
