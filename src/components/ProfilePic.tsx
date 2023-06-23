export default function ProfilePic({ image }: { image: string }) {
  return (
    <div className="profilePicContainer">
      <img src={image} alt="profile picture" className="profilePic" />
    </div>
  );
}
