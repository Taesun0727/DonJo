import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core';
import { getAccount, getProvider } from '@wagmi/core';
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import Web3 from "web3";
import sendToastMessage from '../../utils/sendToastMessage';
import { supportApi } from '../support';

export const donateWishlist = async (wishlist, donatorMessage) => {
  const account = getAccount();
  const provider = getProvider()
  const web3 = new Web3(provider);
  const config = await prepareWriteContract({
    abi: ApplicationHandler.abi,
    address: '0xb4787A11745AfC48D76c2E603164118502447EC6',
    functionName: 'buyWishlistDonation',
    args: [wishlist.seller, wishlist.id],
    overrides: {
      gasLimit: 8000000,
      value: web3.utils.toWei(wishlist.price.toString(), "ether"),
    },
    chainId: 80001
  });

  const { hash } = await writeContract(config).catch((error) => {
    sendToastMessage("wishlist donate fail")
    return
  })

  console.log(123)

  const donationDto = {
    amountEth: parseFloat(wishlist.price),
    fromAddress: account.address,
    sendMsg: donatorMessage,
    supportType: "wishlist",
    supportTypeUid: wishlist.id, // 아이템 uid
    toAddress: wishlist.seller,
    transactionHash: hash,
  };

  await saveDonation(donationDto)

  if (wishlist.sendMsg !== "") {
    sendToastMessage(wishlist.sendMsg)
  }

  return hash
}

export const waitDonateWishlist = async (hash) => {
  const data = await waitForTransaction({
    hash,
  })

  if (data) {
    return true;
  }
  return false;
}

const saveDonation = (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {})
    .catch((error) => {});
};