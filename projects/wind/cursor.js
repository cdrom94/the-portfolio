let boxCursor = document.querySelector('#cursor');
window.addEventListener('mousemove', cursor);
function cursor(e) {
	boxCursor.style.top = e.pageY + 'px';
	boxCursor.style.left = e.pageX + 'px';
}
