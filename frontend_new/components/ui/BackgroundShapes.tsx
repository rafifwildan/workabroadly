export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      {/* BLOBS */}
      <img
        src="/blob_shapes/blob-1.svg"
        alt=""
        className="absolute top-0 left-0 w-[28rem] animate-float animate-shimmer animation-delay-500 opacity-80"
        style={{ marginTop: "-8rem", marginLeft: "-6rem" }}
      />

      <img
        src="/blob_shapes/blob-2.svg"
        alt=""
        className="absolute top-1/3 right-0 w-[32rem] animate-float animate-shimmer animation-delay-1500 opacity-80"
        style={{ marginRight: "-10rem" }}
      />

      <img
        src="/blob_shapes/blob-3.svg"
        alt=""
        className="absolute top-2/3 right-2/3 -translate-x-1/2 w-[40rem] animate-float animate-shimmer animation-delay-2500 opacity-80"
        style={{ marginBottom: "-12rem" }}
      />

      {/* STARS */}
      <img
        src="/star-animation/star-1.svg"
        alt=""
        className="absolute top-4 left-20 w-10 animate-float animation-delay-500"
      />

      <img
        src="/star-animation/star-2.svg"
        alt=""
        className="absolute top-32 right-24 w-10 animate-float animation-delay-1000"
      />

      <img
        src="/star-animation/star-3.svg"
        alt=""
        className="absolute top-64 left-1/3 w-10 animate-float animation-delay-1500"
      />

      <img
        src="/star-animation/star-4.svg"
        alt=""
        className="absolute top-[450px] right-1/3 w-10 animate-float animation-delay-2000"
      />

      <img
        src="/star-animation/star-5.svg"
        alt=""
        className="absolute top-[700px] left-10 w-10 animate-float animation-delay-2500"
      />

      <img
        src="/star-animation/star-6.svg"
        alt=""
        className="absolute top-[1000px] right-14 w-10 animate-float animation-delay-3000"
      />

      <img
        src="/star-animation/star-7.svg"
        alt=""
        className="absolute top-[1300px] left-1/2 w-10 animate-float animation-delay-2000"
      />
    </div>
  );
}
