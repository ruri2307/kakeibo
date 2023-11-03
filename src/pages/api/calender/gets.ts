import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export  default async function handler (req: NextApiRequest, res: NextApiResponse) {

    //switch文でメソッド(リクエストのタイプ)別に場合分けを行う
    switch (req.method) {

        //投稿取得用API
        case 'GET':
            //リクエストの中のidを取得
            const id = req.query.id
            // idが指定されているか否かで場合分けを行う
            if(id != null) {
                //idが指定されている場合、そのidの投稿をデータベースから取得
                try {
                    const post = await prisma.payAmount.findMany({
                        where: {
                            payOptionId: Number(id)
                        }
                    })
                //そのidの投稿が存在しない場合、NotFoundを返す
                if(post == null) {
                    res.status(404).json({ message: 'post not found' })
                    break
                }
                //取得に成功した場合、取得した投稿を返す
                res.status(200).json(post)
                break
                } catch(error) {
                    //データベースの接続エラーなどで取得できなかった場合，InternalServerErrorを返す
                    res.status(500).json({ message: error })
                    break
                }
            } else {
                // idが指定されていない場合、全ての投稿をデータベースから取得
                try {
                    const posts = await prisma.payAmount.findMany
                    //取得に成功した場合、取得した投稿を返す
                    res.status(200).json(posts)
                    break
                } catch (error) {
                    //データベースの接続エラーなどで取得できなかった場合、InternalServerErrorを返す
                    res.status(500).json({ message: error })
                    break
                }
            }
    }
}