import { Card } from '@/components/ui/card';
import ProfileInfo from './component/profile-info';
import { Header } from '@/components/layout/header';
import { TransactionCard } from './component/transaction-card';

const ProfilePage = () => {
  const profileDetails = {
    name: 'Yosep',
    email: 'yosepgans@gmail.com',
    phone: '083896833122',
    gender: 'Male',
    address:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  };

  const transactions = [
    {
      item: 'wallpapers',
      date: 'Saturday, 14 Juli 2021',
      price: 'Rp.500.000',
      subTotal: '500.000',
      image: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
    },
    {
      item: 'wallpapers',
      date: 'Saturday, 14 Juli 2021',
      price: 'Rp.500.000',
      subTotal: '500.000',
      image: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
    },
    {
      item: 'wallpapers',
      date: 'Saturday, 14 Juli 2021',
      price: 'Rp.500.000',
      subTotal: '500.000',
      image: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
    },
    {
      item: 'wallpapers',
      date: 'Saturday, 14 Juli 2021',
      price: 'Rp.500.000',
      subTotal: '500.000',
      image: 'https://wallpapercave.com/uwp/uwp4532001.jpeg',
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Header */}
      <Header />

      {/* Profile Section */}
      <div className=" lg:flex w-[100%] justify-between">
        {/* Profile Information */}
        <div className="space-y-4">
          <h2 className="text-2xl text-red-500 font-black">My Profile</h2>
          <div className="sm:flex gap-4 ml-4">
            {/* Profile Details */}
            <Card className="w-auto sm:w-[400px] lg:w-[400px] h-[420px]">
              <img
                src="https://wallpapercave.com/wp/wp13357407.jpg"
                alt="Profile"
                className="rounded-lg w-full h-full object-cover "
              />
            </Card>
            <div className="space-y-2 text-balance">
              <ProfileInfo
                label="Name"
                value={profileDetails.name}
              />
              <ProfileInfo
                label="Email"
                value={profileDetails.email}
              />
              <ProfileInfo
                label="Phone"
                value={profileDetails.phone}
              />
              <ProfileInfo
                label="Gender"
                value={profileDetails.gender}
              />
              <ProfileInfo
                label="Address"
                value={profileDetails.address}
              />
            </div>
          </div>
        </div>

        {/* Transaction Section */}
        <div className="space-y-4 relative w-full md:w-[800px] m-4 h-[420px] overflow-hidden">
          <div className="sticky top-0 bg-black z-10">
            <h2 className="text-2xl text-red-500 font-black">My Transaction</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-50px)]">
            {/* Adjust height to account for the header */}
            <div className="flex flex-col space-y-2">
              {transactions.map((transaction, index) => (
                <TransactionCard
                  key={index}
                  transaction={transaction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
