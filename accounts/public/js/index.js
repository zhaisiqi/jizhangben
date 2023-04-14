let delBtns = document.querySelector('.delBtn')
delBtns.forEach(item => {
  item.addEventListener('click', () => {
    if (confirm('你确定删除吗？')) {
      return true
    } else {
      //阻止默认行为
      e.preventDefault();
    }
  })
})