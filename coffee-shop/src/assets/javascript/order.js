alert('hello')
$('#gameButton').on('hidden.bs.modal', function() {
    var $this = $(this).find('iframe'),
    tempSrc = $this.attr('src');
    console.log($this);
    console.log(tempSrc);
    $this.attr('src', "");
    $this.attr('src', tempSrc);
});