import dayjs from "dayjs";
import prisma from "../../database/prisma.js";
import { convertValue } from "../../utils/helper.js";

const getAll = async (payload) => {
  const { userId, type, unit } = payload;
  const where = {};
  if (userId) where.userId = String(userId);
  if (type) where.type = String(type);
  const metrics = await prisma.metric.findMany({
    where,
    orderBy: { date: 'asc' },
  });

  const result = unit
    ? metrics.map(m => ({
        ...m,
        value: convertValue(m.type, m.value, m.unit, String(unit)),
        unit,
      }))
    : metrics;
  return result
};

const create = async (payload) => {
  const { userId, type, value, unit, date } = payload;

  if (!userId || !type || !value || !unit || !date) {
    throw new Error("Missing required fields");
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const metric = await prisma.metric.create({
    data: {
      userId,
      type,
      value,
      unit,
      date: parsedDate,
    },
  });
  return metric
};

const getMetricChart = async (payload) => {
  const { userId, type, unit, period } = payload;

  const now = dayjs();
  const start = now
    .subtract(Number(String(period).replace('m', '')), 'month')
    .startOf('day');

  const where = {
    date: {
      gte: start.toDate(),
      lte: now.endOf('day'),
    },
  };
  if (userId) where.userId = Number(userId);
  if (type) where.type = String(type);

  const metrics = await prisma.metric.findMany({
    where,
    orderBy: { date: 'desc' },
  });

  const grouped = {}; // key: date string, value: latest metric of that day
  metrics.forEach((m) => {
    const d = dayjs(m.date).format('YYYY-MM-DD');
    if (!grouped[d] || dayjs(m.createdAt).isAfter(dayjs(grouped[d].createdAt))) {
      grouped[d] = m; // gán nếu chưa có hoặc nếu m.date mới hơn
    }
  });

  console.log(2222, grouped);
  
  const result = Object.values(grouped).map((m) => ({
    date: m.date,
    value: unit ? convertValue(m.type, m.value, m.unit, String(unit)) : m.value,
    unit: unit || m.unit,
  }));

  return result;
};


export default {
  getAll,
  create,
  getMetricChart
};