import { REACT_APP_BASE_URL } from '../../api/axios/axios';
// import { Link } from 'react-router-dom';

type ImageProps = {
  image: string;
};

const SinglePhoto = ({ image }: ImageProps) => {
  // const mainImg: string = `${REACT_APP_BASE_URL}/${image}`;
  const path = image.split('images')[1].slice(1);
  return (
    <li className="w-36 h-30 2xl:w-80 xl:w-60 lg:w-52 md:w-44 border hover:scale-110 transition duration-300  rounded overflow-hidden relative m-1 cursor-pointer">
      <img className="origin-center w-full h-full" src={`${REACT_APP_BASE_URL}/${image}`} alt="Nesto" />
    </li>
  );
};

export default SinglePhoto;
