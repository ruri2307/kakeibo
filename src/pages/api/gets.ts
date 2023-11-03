import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

//ホーム画面のカレンダー
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//switch文でメソッド（リクエストのタイプ）別に場合分けを行う
switch(req.method) {

    //投稿取得用API
    case 'GET' :
    //全ての投稿をデータベースから取得
    try {
        const posts = await prisma.payAmount.findMany
        //取得に成功した場合、取得した投稿を返す
        res.status(200).json(posts)
        break
    } catch (error) {
        //データベースの接続エラーなどで取得できなかった場合、InternalServerErrorを返す
        res.status(500).json({messsage: error})
        break
    }
}
}




