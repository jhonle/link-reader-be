import axios from "axios";
import React, { useState } from "react";

export default function ScrapeLinks() {
  const [scrape, setScrape] = useState("");
  const [links, setLinks] = useState([["", 0]]);

  function onInputChange(event: any) {
    setScrape(event.target.value);
  }
  async function onScrape() {
    const res = await axios.post("http://localhost:3000/links", {
      link: scrape,
    });
    const linksObj = JSON.parse(res.data.links);
    setLinks(Object.keys(linksObj).map((key) => [key, linksObj[key]]));
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add a new page"
          onChange={onInputChange}
        />
        <button onClick={onScrape}>Scrape</button>
      </div>
      <div>
        {!!links.length && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Links</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={2}>
                  <td>{link[0]}</td>
                  <td>{link[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
