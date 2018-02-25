# AWTProject
#Requirements:

#Truffle https://github.com/trufflesuite/truffle
#Ganache-cli https://github.com/trufflesuite/ganache-cli.git
#IPFS https://ipfs.io/docs/getting-started/
#lite-server https://www.npmjs.com/package/lite-server
#MetaMask https://metamask.io/

#installation
npm install -g truffle
npm install -g ganache-cli
#follow the instruction to install IPFS @ https://ipfs.io/docs/getting-started/
metamask -> chrome extension

cd AWTProject
npm install
npm install lite-server --save-dev
#in seperate terminal run ganache-cli, which is new version of testrpc it will start a hd wallet with a menomic . copy that menomic then

Truffle compile
Truffle deploy

#finaly 
npm run dev //starting the lite server 
#now set up the metamask on chrome or firefox paste the menomics into the seed, set a password , at left top you would see networks click to choose private and set up newtrok at http://127.0.0.1:8545. done and refresh the main page.
# run IPFS Daemon to start an ipfs listener, so one can access the music hashes.
ipfs daemon 

#to add a file to ipfs simply go the file
#ipfs add "song name" or entire album
