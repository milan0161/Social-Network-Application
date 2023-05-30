import { faPhotoFilm, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useCreatePostMutation } from '../../features/post/api/postApi';
import Loading from '../UI/Loading';

const PostForm = () => {
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [content, setContent] = useState<string>('');

  const imagePickerRef = useRef<HTMLInputElement>(null);
  // const contentRef = useRef<HTMLTextAreaElement>(null);

  const [createPost, { data, isSuccess, isError, error, isLoading }] = useCreatePostMutation();

  const contentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const imagesPreviewer = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    let selectedFiles;
    if (e.target.files) {
      selectedFiles = e.target.files[0];
    }
    if (selectedFiles) {
      reader.readAsDataURL(selectedFiles);
    }
    reader.onload = (readerEvent) => {
      setImagePreview(readerEvent.target?.result);
    };
    // if (selectedFiles?.length === 0) {
    //   Array.prototype.forEach.call(selectedFiles, (file) => {
    //     reader.readAsDataURL(file);
    //   });
    // }
    // reader.onload = (event) => {};
  };
  const createPostHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost({ images: imagePickerRef.current?.files![0], content: content });
    setContent('');
    setImagePreview(null);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    console.log(data);
  }
  if (isError) {
    console.log(error);
  }
  return (
    <form className="border-2 w-2/4 mx-auto" onSubmit={createPostHandler}>
      <div className="relative mx-auto  flex flex-col items-center w-full">
        <textarea value={content} onChange={contentHandler} className="w-full h-24 m-0" placeholder="Post content" />
        <input ref={imagePickerRef} type="file" name="images" onChange={imagesPreviewer} hidden accept="image/*" />
        {imagePreview && <img className="w-2/4 mx-auto my-1" src={imagePreview} alt="" />}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            imagePickerRef.current?.click();
          }}
          className="border border-slate-300 absolute top-16 left-2"
        >
          <FontAwesomeIcon icon={faPhotoFilm} />
        </button>
        {imagePreview && (
          <button
            type="button"
            className="border border-slate-300 px-1 absolute right-1 top-24 rounded"
            onClick={() => setImagePreview(null)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
      <div className="w-full mx-auto">
        <button className="border border-slate-300 w-full rounded bg-blue-400 text-white cursor-pointer hover:scale-105 transition duration-300">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default PostForm;
