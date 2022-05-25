<script>
  (function() {
    
    // Change the CSS selector in the parenthesis to match your select menu
    var selectMenu = document.querySelector('select#vendors');
    
    var callback = function(e) {
      var selectedOption = e.target.options[e.target.selectedIndex];
      window.dataLayer.push({
        event: 'selectionVendor',
        selectedElement: selectedOption
      });
    };
    
    selectMenu.addEventListener('change', callback, true);
  })();
</script>