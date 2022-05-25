<iframe name="iframe" src="" width="100%" height="1000px" scrolling="no" style="border-width: 0px;"></iframe>
<script>
  var userName = document.getElementsByClassName('loginBoxProfileLink')[0].innerText;
  userName = userName.trim();
  userName = userName.toLowerCase();
  var firstName = userName.substr(0,1);
  var lastName = userName.substr(userName.indexOf(" ")+1);
  userName = firstName + lastName;
  window.onload = function() {
    document.getElementById('userName').value = userName;
    Nav();
  }
</script>
 <form action="https://catalog.eyeprogpo.com/visualization/" method="post" id="form" target="iframe">
        <input id='userName' type="text" name="userName" value='' hidden=""><br>
    </form>
</div>
<script>
    function Nav() {
        form = document.getElementById('form');
        form.submit();
    }
</script>