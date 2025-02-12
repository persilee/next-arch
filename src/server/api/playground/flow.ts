export default defineEventHandler(async (event) => {
  const { user } = await readBody(event)

  const result = await rollerCoasterFlow.add({
    name: 'roller',
    queueName: 'rollerCoaster',
    data: { user },
    children: [
      {
        name: 'prepare',
        queueName: 'rollerCoasterPrepare',
        data: { user },
      },
    ],
  })
})
