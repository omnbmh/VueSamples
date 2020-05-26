
// 0x07 2.1.2 start

Vue.filter('date', time => moment(time).format('YYYY-MM-DD HH:mm'));
new Vue({
    el:'#notebook',
    data(){
        return {
//        content:'This is a note.';
          content: localStorage.getItem('content') || 'you can write in ** markdown **',
          notes:JSON.parse(localStorage.getItem('notes'))|| [],
//          items:[
//            { title : 'item 1'},
//            { title : 'item 2'},
//            { title : 'item 3'},
//          ],
          selectedId: localStorage.getItem('selected_id') || null,
        }
    },
    computed:{
        notePreview(){
//            return marked(this.content)
            return this.selectedNote ? marked(this.selectedNote.content) : ' not select'
        },
        btnTitle(){
            return this.notes.length+' note(s) already';
        },
        selectedNote() {
            return this.notes.find(note => note.id === this.selectedId);
        },
        // 进行一下 排序
        sortedNotes(){
            return this.notes.slice().sort((a,b) => a.created -b.created)
                .sort((a,b) => (a.favorite === b.favorite) ?0 : (a.favorite?-1:1))
        },
    },
    // 修改监听器
    watch:{
//        content:{
////            handler(val,oldval) {
////                console.log("new note: "+ val + " old note: "+ oldval)
////                localStorage.setItem('content',val)
////            },
//
//            handler: "saveNote",
//
//        },
        content: 'saveNote',
        notes:{
            handler:"saveNotes",
            // 来监听 notes 数组中每个属性的变化
            deep: true,
        },
        selectedId(val){
            localStorage.setItem('selected_id',val)
        },
    },
    // 复用方法
    methods:{
        saveNote(val){
            console.log("saving note: "+ this.content);
            localStorage.setItem('content',val);
            // 调用另一个方法
            this.reportOperation('saving');
        },
        reportOperation(opName){
            console.log('The ' + opName + ' operation was complated!');
        },
        addNote(){
            const time = Date.now();
            // 默认note
            const note ={
                id : String(time),
                title: 'New Note ' + (this.notes.length + 1),
                content : '**Hi**, write a new Note',
                created : time,
                favorite : false,
            };
            this.notes.push(note);
        },
        selectNote (note){
            this.selectedId = note.id;
        },
        saveNotes (){
            // 存储前将 对象 转换为 字符串
            localStorage.setItem('notes',JSON.stringify(this.notes))
            console.log('Notes Saved! ' + new Date())
        },
        removeNote (){
            if (this.selectedNote  && confirm('Delete the note?')){
                const index = this.notes.indexOf(this.selectedNote);
                if (index !== -1){
                    this.notes.splice(index,1)
                }
            }
        },
        favoriteNote () {
        // 下面两行代码是相同的含义
//            this.selectedNote.favorite = !this.selectedNote.favorite ;
            this.selectedNote.favorite = this.selectedNote.favorite ^ true;

        },
    },
    // 当实例准备就绪 j就会调用这个钩子
    created(){
        this.content = localStorage.getItem('content') || 'you can write in ** markdown **';
    },


});
// 0x07 2.1.2 end