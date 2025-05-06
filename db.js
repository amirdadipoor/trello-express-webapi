const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'] // ✅ enable logging
});

module.exports = prisma;