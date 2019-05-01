import React, { useEffect, useState } from 'react';
import { Spin, Icon } from 'antd';
import useFetch from './useFetch';
import Footer from './Footer';
import './App.css';

const App = () => {
  const [yards, setYards] = useState(null);
  const [data, loading, error] = useFetch('/yards');

  useEffect(() => {
    if (data) {
      setYards(data);
    }
  }, [data]);

  if (error) {
    return (
      <div className="App">
        <p className="error">Something went wrong.</p>
        <Footer />
      </div>
    );
  }
  if (loading) {
    return (
      <div className="App">
        <p className="fetching">Fetching Latest Data...</p>
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 60 }} spin />}
        />
      </div>
    );
  }
  return (
    <div className="App">
      <p className="yards">{yards} Yards Passing</p>
      <Footer />
    </div>
  );
};

export default App;
