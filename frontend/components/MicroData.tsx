const Microdata = ({ data }:any) => {
    const structuredData = JSON.stringify(data);
  
    return (
      <>
        <script type="application/ld+json">{structuredData}</script>
      </>
    );
  };