import { Request, Response } from 'express';
import db from '../database/connection';
import Util from '../util/util';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return res.status(400).json({
        error: 'Missing filters to search classes',
        status: 400,
      });
    }

    const timeInMinutes = Util.convertTimeToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      cost,
      schedule,
      subject
    } = req.body;

    const trx = await db.transaction();

    try {
      const [user_id] = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });

      const [class_id] = await trx('classes').insert({
        subject,
        cost,
        user_id
      });

      const classSchedule = schedule.map((i: ScheduleItem) => ({
        class_id,
        week_day: i.week_day,
        from: Util.convertTimeToMinutes(i.from),
        to: Util.convertTimeToMinutes(i.to),
      }));

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class',
        status: 400,
      });
    }
  }
}
