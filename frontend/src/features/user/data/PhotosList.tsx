import { useParams } from 'react-router-dom';
import { useGetSingleUserQuery, useGetUserPhotosQuery, useSetProfilePictureMutation } from '../api/userApiSlice';
import { Stack, ImageList, ImageListItem, Box, ImageListItemBar } from '@mui/material';
import SinglePhoto from '../../../components/profile/SinglePhoto';
import Loading from '../../../components/UI/Loading';
import { REACT_APP_BASE_URL } from '../../../api/axios/axios';
import { useAppSelector } from '../../../app/hooks';
// const mainImg: string = `${REACT_APP_BASE_URL}/${image}`;

const PhotosList = () => {
  const { id } = useParams();
  const { data, isSuccess, isError, isLoading, error } = useGetUserPhotosQuery(id!);
  const [setProfilePic, {}] = useSetProfilePictureMutation();
  const user = useAppSelector((state) => state.auth.user);

  // const { refetch } = useGetSingleUserQuery(user.id);

  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <h2 className="text-center">{error.message}</h2>;
  }
  if (isSuccess) {
    console.log(data);
    content = (
      <Stack spacing={4}>
        <Box
          className="mx-auto border border-slate-400 rounded h-[300px] 2xl:w-2/3 2xl:h-[450px] xl:w-2/3 xl:h-[400px] lg:w-3/4 lg:h-[350px] md:w-3/4"
          sx={{ overflowY: 'scroll' }}
        >
          <ImageList
            // className="mx-auto border border-slate-400"
            variant="woven"
            cols={3}
            // rowHeight={164}
          >
            {data?.allImages.map((image, index) => {
              return (
                <ImageListItem
                  className="single_image relative border border-slate-300 rounded mx-[2px] my-1 transition duration-300"
                  key={index}
                >
                  <img src={`${REACT_APP_BASE_URL}/${image.path}`} alt={image.id} loading="lazy" />
                  {user.id === image.authorId && (
                    <button
                      onClick={() => {
                        const confirm = window.confirm('Are you sure?');
                        if (confirm) {
                          return setProfilePic(image.id), window.location.reload();
                        }
                        return;
                      }}
                      className="absolute top-0 text-white bg-slate-900 bg-opacity-30 w-full transition duration-300 invisible hover:font-bold"
                    >
                      Set as Profile Picture
                    </button>
                  )}
                  <ImageListItemBar title={image.post.content} />
                </ImageListItem>
              );
            })}
          </ImageList>
        </Box>
      </Stack>
    );
    // content = (
    //   // <div className="container mx-auto border w-3/5 p-2 border-slate-700">
    //   <ul className="flex flex-wrap mx-auto 2xl:max-h-[440px] xl:h-[350px] lg:h-[310px] md:h-[265px] max-h-[328px] py-2 w-3/4 border-2 justify-center overflow-y-scroll">
    //     {data?.allImages.map((image, index) => {
    //       return <SinglePhoto key={index} image={image} />;
    //     })}
    //   </ul>
    //   // </div>
    // );
  }

  return <>{content}</>;
};

export default PhotosList;
