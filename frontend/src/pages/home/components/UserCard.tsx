import { Avatar, Card } from "antd";

const { Meta } = Card;

interface IUserCardProps {
  user: {
    username: string;
  };
}

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  return (
    <>
      <Card
        style={{ width: "100%", marginTop: 16, marginBottom: 32 }}
        loading={false}
      >
        <Meta
          style={{ display: "flex", alignItems: "center" }}
          avatar={
            <Avatar style={{ backgroundColor: "#001529", color: "white" }}>
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={user.username.toUpperCase()}
        />
      </Card>
    </>
  );
};

export default UserCard;
