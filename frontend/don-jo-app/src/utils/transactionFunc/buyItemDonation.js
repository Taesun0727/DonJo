import Web3 from "web3";
import ApplicationHandler from "../../contracts/ApplicationHandler.json";
import { supportApi } from "../../api/support";
import { isMobile } from "react-device-detect";
import sendToastMessage from "../sendToastMessage";

export const buyItemDonation = (item) => {
  // 모바일 여부 확인
  if (!isMobile) {
    // 메타마스크 설치 여부 확인
    if (typeof window.ethereum !== "undefined") {
      // 메타마스크가 설치되어 있으면, 로그인 요청
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const web3 = new Web3(window.ethereum);
          web3.eth.net.getId().then((chainId) => {
            const infuraWeb3 = new Web3(
              new Web3.providers.HttpProvider(
                "https://polygon-mumbai.infura.io/v3/1d3e75e17f6f49fea625e1d555738da0"
              )
            );
            web3.setProvider(infuraWeb3.currentProvider);
            const priceInMatic = parseFloat(item.price) * 10 ** 18;
            const valueInWei = web3.utils.toWei(priceInMatic.toString(), "wei");
            console.log("typeof valueInWei: ", typeof valueInWei);
            console.log("valueInWei: ", valueInWei);
            const myContract = new web3.eth.Contract(
              ApplicationHandler.abi, // abi 설정
              "0xb4787A11745AfC48D76c2E603164118502447EC6" // contract 주소
            );

            const tx = myContract.methods.buyItemDonation(item.seller, item.id);

            window.ethereum
              .request({
                method: "eth_sendTransaction",
                params: [
                  {
                    from: accounts[0],
                    to: "0xb4787A11745AfC48D76c2E603164118502447EC6",
                    value: valueInWei,
                    data: tx.encodeABI(),
                  },
                ],
              })
              .then((txHash) => {
                const donationDto = {
                  amountEth: item.price,
                  fromAddress: accounts[0],
                  sendMsg: "",
                  supportType: "item",
                  supportTypeUid: item.id,
                  toAddress: item.seller,
                  transactionHash: txHash,
                };

                console.log("donationDto", donationDto);
                saveDonation(donationDto);

                const receiptPromise = new Promise(function (resolve, reject) {
                  const intervalId = setInterval(function () {
                    web3.eth.getTransactionReceipt(txHash).then((receipt) => {
                      if (receipt !== undefined && receipt !== null) {
                        clearInterval(intervalId);
                        resolve({ receipt, txHash });
                      }
                    });
                  }, 1000);
                });
                return receiptPromise;
              })
              .then(({ receipt, txHash }) => {
                const logs = receipt.logs.filter(
                  (log) =>
                    log.topics[0] === web3.utils.sha3("SupportIdEvent(uint64)")
                );
                if (logs.length > 0) {
                  const log = logs[0];
                  console.log("log: ", log);
                  const id = web3.eth.abi.decodeParameters(
                    ["uint64"],
                    log.topics[1]
                  )[0];
                  console.log("type id: ", typeof id);
                  updateDondationInfo(id, txHash);
                } else {
                  sendToastMessage("Failed to register support record.");
                }
              })
              .catch((err) => console.log(err));
          });
        });
    } else {
      // Metamask를 설치할 수 있도록 코드 추가...
      const downloadLink = "https://metamask.io/download.html";
      const message =
        "MetaMask 확장 프로그램이 설치되어 있지 않습니다. 다운로드 페이지로 이동하시겠습니까?";

      if (window.confirm(message)) {
        window.open(downloadLink, "_blank");
      }
    }
  }
};

const saveDonation = async (donationDto) => {
  supportApi
    .saveSponsorshipDetail(donationDto)
    .then((res) => {
      console.log("저장 성공!");
    })
    .catch((error) => {
      console.log("저장 실패");
    });
};

const updateDondationInfo = async (supportUid, transactionHash) => {
  supportApi
    .updateSponsorshipArrived(supportUid, transactionHash)
    .then((res) => {
      console.log("update 성공!");
    })
    .catch((error) => {
      console.log("update 실패!");
    });
};
