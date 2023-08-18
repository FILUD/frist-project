import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/DetailPage.css'

type Mostlike = {
  id: number;
  animal: string;
  choiceTh: string;
};

type Leastlike = {
  id: number;
  animal: string;
  choiceTh: string;
};

function DetailPage() {
  const [MostData, setMostData] = useState<Mostlike[]>([]);
  const [LeastData, setLeastData] = useState<Leastlike[]>([]);
  const [categoryId, setCategoryId] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const historyId = searchParams.get('historyId');


  const fetchDetailData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/get/history/detail?historyId=${historyId}`);

      const responseData = await response.json();

      const leastData = responseData.filter((item: { type: boolean; }) => item.type === false);
      const mostData = responseData.filter((item: { type: boolean; }) => item.type === true);

      setLeastData(leastData);
      setMostData(mostData);
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };


  //get category ID
  const fetchCatIdData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/get/history/byId?historyId=${historyId}`);
      const responseData = await response.json();

      if (Array.isArray(responseData) && responseData.length > 0) {
        // Assuming categoryId is present in the first item of the array
        const firstItem = responseData[0];
        const categoryIdFromResponse = firstItem.categoryId;

        setCategoryId(categoryIdFromResponse);
        console.log('Category ID:', categoryIdFromResponse);
      } else {
        console.error('Invalid or empty response data:', responseData);
      }
    } catch (error) {
      console.error('Error fetching Category ID data:', error);
    }
  };

  const categoryToAnimal: { [key: number]: string } = {
    1: 'cow',
    2: 'rat',
    3: 'bear',
    4: 'eagle',
  };

  useEffect(() => {
    fetchDetailData();
    fetchCatIdData();
  }, []);

  return (
    <div className='container-detail'>
      <h1 className='h1-detail'>Result Detail</h1>

      <li className='text-header-detail'> The choices you have selected that you consider<strong> <u> most like you</u></strong></li>
      {MostData.map((mostLike) => (
        <div className="item-wrapper-detail" key={mostLike.id}>
          <button className="item-detail-most">{mostLike.choiceTh}</button>
        </div>
      ))}
      <li className='text-header-detail'>The choices you have selected that you consider<strong> <u> least like you</u></strong></li>
      {LeastData.map((leastLike) => (
        <div className="item-wrapper-detail" key={leastLike.id}>
          <button className='item-detail-least'>
            {leastLike.choiceTh}</button>
        </div>
      ))} <br /><br />
      <div>
        <li className='text-header-detail'> Result: </li> <br />
        <div className='box-item-img' >
        {categoryId !== null ? (
      <img
        className='item-img-detail'
        src={`/icon/${categoryToAnimal[categoryId]}.png`}
        alt={categoryToAnimal[categoryId]}
      />
    ) : (
      <p>Loading category ID or no data available...</p>
    )}
          {categoryId && <p className='text-result-name'>{categoryToAnimal[categoryId]}</p>}
        </div>
      </div>
      <div>
        <li className='text-header-detail'>Description :</li>
      </div>
    </div>
  );
}

export default DetailPage;
