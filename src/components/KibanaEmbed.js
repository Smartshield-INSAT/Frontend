const KibanaEmbed = () => {
  const kibanaUrl = "http://192.168.100.91:5601/app/r?l=DISCOVER_APP_LOCATOR&v=8.10.2&lz=N4IgjgrgpgTgniAXKANgQwHYHMJq1JEAa2nhABpxSFEQQBfSgZwHsYAXJAbQF1KBjFiggBbDE258QASwwATKAA9CUfgHYoAVjkAmKAFoAbAA5T%2BgCz8AnIf1XNAZn76dm44c1XVAM2Nz%2BFDIY7LAAbmgohGgQ7CyB3tIoITASiLyUcmjsaABq0lAA7gCScirqWroGJmaWNnaOzq7unj5%2BAZTs0iJQAEqY%2BEig3jAsIoQYLAX6AIyaYx1xtBMFDJQwUMNQTAAWRcFhEYMg4cIEiIYADFcXlAAO0Uxn7DDQ9PRAA%3D%3D";  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src={kibanaUrl}
        height="100%"
        width="100%"
        frameBorder="0"
        title="Kibana Dashboard"
        allowFullScreen
      />
    </div>
  );
};

export default KibanaEmbed;
