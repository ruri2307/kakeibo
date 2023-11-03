import type { NextApiRequest, NextApiResponse } from 'next'
import { PayOption, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // switch文でメソッド(リクエストのタイプ)別に場合分けを行う
  switch (req.method) {

    // 投稿作成用API
    case 'POST':
      // リクエストの中のcontentを取得
      const newPey = await req.body.pey
      const newPurpose = await req.body.purpose
      const newPayOptionId = await req.body.payOptionId
      // contentが存在しない場合、BadRequestを返す
      if (newPey == null && newPurpose == null) {
        res.status(400).json({message: 'content is required'})
        break
      }
      // contentが空文字列の場合，BadRequestを返す
      if (newPey == ' ' && newPurpose == ' ') {
        res.status(400).json({ message: 'content is empty' })
        break
      }
      // データベースに新しい投稿を作成
      try {
        const newPost = await prisma.cost.create({
          data: {
            payOptionId: newPayOptionId,
            pey: newPey,
            purpose: newPurpose
          }
        })
        // 作成に成功した場合，作成した投稿を返す
        res.status(200).json(newPost)
        break
      } catch(error) {
        // データベースの接続エラーなどで作成できなかった場合，InternalServerErrorを返す
        res.status(500).json({ message: error })
        break
      }
    }
}