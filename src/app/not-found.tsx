import ErrorPage from '@/components/error-page';

export default function NotFound() {
  return (
    <ErrorPage
      code=""
      title=""
      message="Don't worry, you can still go back to the homepage or continue using our services."
      imgSrc="/404.svg"
    />
  );
}
