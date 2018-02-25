App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load albums.
    $.getJSON('../albums.json', function(data) {
      var musicRow = $('#musicRow');
      var musicTemplate = $('#musicTemplate');

      for (i = 0; i < data.length; i ++) {
        musicTemplate.find('.panel-title').text(data[i].name);
        musicTemplate.find('img').attr('src', data[i].picture);
        musicTemplate.find('.music-genere').text(data[i].genere);
        musicTemplate.find('.music-price').text(data[i].price);
        musicTemplate.find('.music-about').text(data[i].about);
        musicTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        musicTemplate.find('a');
        musicRow.append(musicTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
      // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted album
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', 'img', App.handleAdopt1);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function(instance) {
      adoptionInstance = instance;
    
      return adoptionInstance.getAdopters.call();
    }).then(function(adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-music').eq(i).find('button').text('Success').attr('disabled', true);
          $('.panel-music').eq(i).find('a').attr('href', "http://localhost:8080/ipfs/QmNmSbUmvMcQoD2B2q9HozjRyT3WKjxAWNMC4yTXzv3z9y");
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },
  handleAdopt1: function(event) {
   
  },
  handleAdopt: function(event) {
    event.preventDefault();

    var musicId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;
    
        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(musicId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
 
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
