function Bank() {
  this.accounts = [],
    this.accountNumber = 0
};

Bank.prototype.addAccount = function(account) {
  account.accountNumber = this.addAccountNumber();
  this.accounts.push(account);
};

Bank.prototype.addAccountNumber = function(account) {
  this.currentId += 1;
  return this.currentId;
};

Bank.prototype.findAccount = function(id) {
  for (var i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i]) {
      if (this.accounts[i] == id) {
        return this.accounts[i];
      }
    }
  };
  return false;
}

Bank.prototype.deleteAccount = function(id) {
  for (var i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i]) {
      if (this.accounts[i].id == id) {
        $(function() {
          $('.confirm').click(function() {
            return window.confirm("Are you sure?");
          });
        });
        delete this.accounts[i];
        return true;
      }
    }
  }
  return false;
};

//Account business logic

function Account(name, balance) {
  this.name = name,
  this.balance = balance
  console.log(name, balance);
};

Account.prototype.deposit = function(amount) {
  this.balance = this.balance += amount;
};

Account.prototype.withdraw = function(amount) {
  this.balance = this.balance -= amount;
};

Account.prototype.newAccount = function(account) {

};

//Front end logic

var userBank = new Bank();

function updateBalance(accountNumber) {

}

function listAccounts(userBank) {
  var accountsList = $("ul#accounts");
  var htmlForAccountList = "";
  userBank.accounts.forEach(function(account) {
    htmlForAccountList += "<li id=" + this.accountNumber + ">" + account.name + "</li>";
  })
  accountsList.html(htmlForAccountList);
  $(".other-accounts").show();
};

function showAccounts(accountNumber) {
  var account = userBank.findAccount(accountNumber);
  $(".tracker").show();
  $(".name").html(account.name);
  $(".number").html(accountNumber);
  $(".balance").html(account.balance);
  var buttons = $(".delete-button");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + +accountNumber + ">Delete</button>");
}

function attachAccountListeners() {
  $("ul#accounts").on("click", "li", function() {
    showAccounts(this.accountNumber);
  });
  $(".delete-button").on("click", ".deleteButton", function() {
      userBank.deleteAccount(this.accountNumber);
      $(".tracker").hide();
      showAccounts(userBank)
    });
  };

  $(document).ready(function() {
    attachAccountListeners();
    $("form#new-account").submit(function(event) {
      event.preventDefault();
      var inputtedName = $("input#inputtedName").val();
      var inputtedInitialDeposit = $("input#inputtedInitialDeposit").val();
      var newAccount = new Account(inputtedName, inputtedInitialDeposit);
      userBank.addAccount(newAccount);
      listAccounts(userBank);
    });
  });
