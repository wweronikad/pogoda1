import React from 'react';
import './Footer.css';

const apiSources = [
  { name: "zanieczyszczenia powietrza GIOŚ", url: "https://powietrze.gios.gov.pl/pjp/content/api" },
  { name: "dane IMGW synoptyczne, hydrologiczne", url: "https://danepubliczne.imgw.pl/pl/apiinfo" },
  { name: "dane przemieszczania słońca", url: "https://sunrise-sunset.org/api" },
  { name: "dane o geolokalizacji Nominatim", url: "https://nominatim.org/release-docs/develop/api/Search/" },
  { name: "dane o przemieszczaniu się słońca", url: "https://sunrise-sunset.org/api" },
];

function Footer() {
  return (
    <footer className="footer">
      <p>
        Źródła API:{" "}
        {apiSources.map((source, index) => (
          <span key={index}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a>
            {index < apiSources.length - 1 && ", "}
          </span>
        ))}
      </p>
    </footer>
  );
}


export default Footer;
