<template>
    <div class="rightCom">
        <div class="community">
            <div class="top">
                社区最新问答
            </div>
            <div class="mainright">
                 <ul>
                     <li><a href="#">社区最新问答</a></li>
                     <li><a href="#">社区最新问答</a></li>
                     <li><a href="#">社区最新问答</a></li>
                     <li><a href="#">社区最新问答</a></li>
                 </ul>
            </div>
        </div>

        <div class="community">
            <div class="top">
                热门分享
            </div>
            <div class="mainright">
                <ul>
                    <li><a href="#">热门分享</a></li>
                    <li><a href="#">热门分享</a></li>
                </ul>
            </div>
        </div>

        <div class="community">
            <div class="top">
                热门活动
            </div>
            <div class="mainright">
                <ul>
                    <li><a href="#">热门活动</a></li>
                    <li><a href="#">热门活动</a></li>
                    <li><a href="#">热门活动</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
    .rightCom{
        width:25%;
        float:right;
    }
    .rightCom .community{
        width:100%;
        padding:0 20px;
        background: #fff;
        text-align: center;
        margin-top:20px;
    }
    .rightCom .community .top{
        height:50px;
        font-size: 16px;
        line-height: 50px;
        width:100%;
        color:#000;
        text-align: center;
        border-bottom:1px solid #ddd;
    }
    .rightCom .community .mainright{
        width:100%;
        margin-top: 10px;
    }
    .rightCom .community .mainright ul{
        width:100%;
        background: #fff;
        margin:0;
        padding: 0;
    }
    .rightCom .community .mainright ul li{
        width:100%;
        text-align: center;
        color:#666;
        height:40px;
        line-height: 40px;
        list-style-type: none;
    }
    .rightCom .community .mainright ul li a{
        color:#666;
        text-decoration: none;
    }
    @media screen and (max-width: 450px) {
        .rightCom{
            display: none;
        }
    }
</style>