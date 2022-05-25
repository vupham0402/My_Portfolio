<script>
  (function() {
    
    // Change the CSS selector in the parenthesis to match your select menu
    var selectMenu = document.querySelector('select#mainCategory');
    
    var callback = function(e) {
      var selectedOption = e.target.options[e.target.selectedIndex];
      window.dataLayer.push({
        event: 'selectionCategory',
        selectedElement: selectedOption
      });
    };
    
    selectMenu.addEventListener('change', callback, true);
  })();
</script>