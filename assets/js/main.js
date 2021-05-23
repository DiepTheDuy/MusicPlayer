// to do

/**
 * 1. render song
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / pre
 * 6. Random
 * 7. Next / repeat when end
 * 8. Active song
 * 9. Srcoll active song into view
 * 10. Play song when click
 */

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const heading = $('header h2');
    const headingSub = $('header h5');
    const cdThumb = $('.cd-thumb');
    const audio = $('#audio');
    const cd = $('.cd');
    const playBtn = $('.btn-toggle-play')
    const player = $('.player')
    const progress = $('#progress')
    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const repeatBtn = $('.btn-repeat')
    const playlist = $('.playlist')
    const cdImg = $('cd-img')

        const app = {
            currentIndex: 0 ,
            isPlaying: false ,
            isTimeupdate : true ,
            isRandom: false ,
            isRepeat: false,
            songs: [
                {
                    name: "Khi em lớn",
                    singer: "Organe ft. Hoàng Dũng",
                    path: "music/KhiEmLon.mp3",
                    image:"img/KhiEmLon.jpg",
                },
                
                {
                    name: "Xin đừng nhấc máy",
                    singer: "Bray ft. Hansara",
                    path: "music/XinDungNhacMay.mp3",
                    image: "img/XinDungNhacMay.jpg",
                },
            
                {
                    name: "Do for love",
                    singer: "Bray ft. Amme",
                    path: "music/DoForLove.mp3",
                    image: "img/DoForLove.jpg",
                },
            
                {
                    name: "Flex'in trên cricle K",
                    singer: "LowG",
                    path: "music/FlexTrenCK.mp3",
                    image:"img/FlexTrenCK.jpg",
                },
            
                {
                    name: "Thủ đô cypher",
                    singer: "RPT Orijinn, LOW G, RZMas, RPT MCK",
                    path: "music/ThuDoCypher.mp3",
                    image: "img/ThuDoCypher.jpg",
                },
                {
                    name: "Gác lại âu lo",
                    singer: " Da LAB ft. Miu Lê",
                    path: "music/GacLaiAuLo.mp3",
                    image: "img/GacLaiAuLo.jpg",
                },
                {
                    name: "Đường về nhà",
                    singer: "Đên vâu ft. Justee",
                    path: "music/DuongVeNha.mp3",
                    image: "img/DuongVeNha.jpg",
                },
                {
                    name: "Okokokok",
                    singer: "LowG",
                    path: "music/Okok.mp3",
                    image: "img/Okok.jpg",
                },
                {
                    name: "Cypher nhà làm",
                    singer: "Low G, Teddie J, Chí, ResQ",
                    path: "music/CypherNhaLam.mp3",
                    image: "img/CypherNhaLam.jpg",
                },
                {
                    name: "Thích quá rùi nà",
                    singer: "tlinh feat. Trung Trần",
                    path: "music/ThichQuaRuiNa.mp3",
                    image: "img/ThichQuaRuiNa.jpg",
                },
                {
                    name: "Phải chăng em đã yêu",
                    singer: "JUKY SAN ft. REDT",
                    path: "music/PhaiChangEmDaYeu.mp3",
                    image: "img/PhaiChangEmDaYeu.jpg",
                },
                {
                    name: "Nàng thơ",
                    singer: "Hoàng Dũng",
                    path: "music/NangTho.mp3",
                    image: "img/NangTho.jpg",
                },
                {
                    name: "Bánh mì không",
                    singer: "ĐạtG x DuUyên",
                    path: "music/BanhMyKhong.mp3",
                    image: "img/BanhMyKhong.jpg",
                },
                {
                    name: "Simple Love",
                    singer: "Obito x Seachains x Davis x Lena",
                    path: "music/SimpleLove.mp3",
                    image: "img/SimpleLove.jpg",
                },
                {
                    name: "Lời yêu ngây dại",
                    singer: "Kha",
                    path: "music/LoiYeuNgayDai.mp3",
                    image: "img/LoiYeuNgayDai.jpg",
                },

            ],  

            render: function (){
                const htmls = this.songs.map((song,index) =>{
                    return `
                        <div  class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                            <div class="thumb"
                                style="background: url('assets/${song.image}') center">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    ` 
                })
                playlist.innerHTML= htmls.join('') ;
                
            },

            defineProperties: function (){
                Object.defineProperty(this, 'currentSong' ,{
                    get: function () {
                        return this.songs[this.currentIndex];
                    }
                })
            },

            handleEvent: function(){
                const _this = this ;

                //Xử lý cd quay
                const cdThumbanimate = cdThumb.animate([
                    { transform: 'rotate(360deg)' }
                ],{
                    duration: 10000 ,
                    iterations: Infinity ,
                })
                cdThumbanimate.pause()

                // khi click sự kiện playlist
                playBtn.onclick = function(){

                    if(_this.isPlaying){                        
                        audio.pause();                       
                    }else{                        
                        audio.play();                        
                    }                                    
                }

                //Khi song được play
                audio.onplay = function(){
                    _this.isPlaying = true ;
                    player.classList.add('playing')   
                    cdThumbanimate.play();
                }
                //Khi song được pause
                audio.onpause = function(){
                    _this.isPlaying = false ;
                    player.classList.remove('playing')  
                    cdThumbanimate.pause(); 
                }

                //Theo dõi tiến độ
                audio.ontimeupdate = function() {
                    if(audio.duration  && checkOnmouseAndTouch){
                        const progressPercent = Math.floor((audio.currentTime / audio.duration)*100);
                        progress.value = progressPercent ;
                    }                   
                    
                }

                //Khi tua song
                let checkOnmouseAndTouch = true;

                progress.onmousedown = function() {
                    checkOnmouseAndTouch = false;
                }
                progress.ontouchstart = function() {
                    checkOnmouseAndTouch = false;
                }

                progress.onchange = function(e){
                    const seekTinme = (e.target.value*audio.duration)/100 ;
                    audio.currentTime = seekTinme ;

                    checkOnmouseAndTouch = true;
                }

                //Khi nhấn next
                nextBtn.onclick = function(){
                    if(_this.isRandom){
                        _this.randomSong();
                    }else{
                        _this.nextSong();
                    }                    
                    audio.play();
                    _this.render();
                    _this.scrollActiveSongToView()
                }

                // Khi nhấn prev
                prevBtn.onclick = function(){
                    if(_this.isRandom){
                        _this.randomSong();
                    }else{
                        _this.prevSong();
                    }                   
                    audio.play();
                    _this.render();
                    _this.scrollActiveSongToView()

                }           

                // Xử lý random bật/tắt random
                randomBtn.onclick = function(){
                    _this.isRandom = !_this.isRandom
                    this.classList.toggle('active', _this.isRandom)
                }
                
                // xử lý sự kiện repeat
                repeatBtn.onclick = function(){
                    _this.isRepeat = !_this.isRepeat
                    this.classList.toggle('active', _this.isRepeat)
                }

                // xử lý next song khi audio ended
                audio.onended = function(){
                    
                    if(_this.isRepeat){
                        audio.play()
                    }else{
                        nextBtn.click()
                    }
                }

                // sự kiện khi click vào playlist
                playlist.onclick = function(e){
                    const optionNode = e.target.closest('.option')
                    const songNode = e.target.closest('.song:not(.active)')
                    if( songNode || optionNode){
                        //khi click vào song
                        if(songNode){
                            console.log(songNode.dataset.index);
                            _this.currentIndex =   Number(songNode.dataset.index);
                            _this.loadCurrentSong();
                            _this.render();
                            audio.play();
                        }
                        //khi clcik vào option
                        if(optionNode){
                            //....
                        }
                    }
                }
            },

            scrollActiveSongToView: function(){
                setTimeout(()=>{
                    $('.song.active').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                },300)
            },

            loadCurrentSong: function (){               

                heading.textContent = this.currentSong.name ;
                cdThumb.style.background = `url('assets/${this.currentSong.image}') center`;                
                audio.src = `assets/${this.currentSong.path}` ;
                headingSub.textContent = this.currentSong.singer ;
            },

            nextSong: function(){
                this.currentIndex++
                if(this.currentIndex >= this.songs.length){
                    this.currentIndex = 0;
                }
                this.loadCurrentSong();
            },
            prevSong: function(){
                this.currentIndex--
                if(this.currentIndex <0 ){
                    this.currentIndex = this.songs.length -1;
                }
                this.loadCurrentSong();
            },

            randomSong: function(){
                let newIndex ;
                do{
                    newIndex = Math.floor(Math.random() * this.songs.length)
                }while(newIndex === this.currentIndex)

                this.currentIndex= newIndex ;
                this.loadCurrentSong();
            },
            
            start: function(){
                // Định nghĩa các thuộc tính cho object
                this.defineProperties();
                //Lắng nghe và sử lý các sự kiện
                this.handleEvent();
                //Tải thông tin bài hát đầu tiên vào UI
                this.loadCurrentSong();
                // Render ra playlist
                this.render();   
                
            }            
        }

        app.start();




