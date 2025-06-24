import { Day, Exercise, Routine, RoutineExercise } from "../models/index.js";
import Movement from "../models/Movement.js";

class RoutineService {

  //Ver que la respuesta de los GETS devualva el objeto usuario y alguna cosa mas que se desee (El movement de cada ejercicio, por ejemplo)
  //Intentar romper el sistema (Ingresar tipos de datos erroneos y foreing keys inexistentes), y en caso de dar errores, especificar que esta sucediendo
  getAllRoutines = async () => {
    const routines = await Routine.findAll({
      include: [
        {
          model: Day,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: RoutineExercise,
          include: [
            {
              model: Exercise,
              attributes: ['id', 'name']
            }
          ],
          attributes: ['id', 'series', 'reps']
        }
      ],
      attributes: ['id', 'name', 'rest_bt_series', 'rest_bt_exercises', 'UserId'],
      order: [['id', 'ASC']]
    });
    return routines;
  };

  getRoutineById = async (id) => {
    const routine = await Routine.findByPk(id,{
      include: [
        {
          model: Day,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        {
          model: RoutineExercise,
          include: [
            {
              model: Exercise,
              include: [
                {
                  model: Movement,
                  attributes: ['name']
                }
              ],
              attributes: ['id', 'name']
            }
          ],
          attributes: ['id', 'series', 'reps']
        }
      ],
      attributes: ['id', 'name', 'rest_bt_series', 'rest_bt_exercises', 'UserId'],
      order: [['id', 'ASC']]
    });

    return routine;
  };

  createRoutine = async ({ name, rest_bt_exercises, rest_bt_series, daysIds, UserId, routineExercises }) => {
    const routine = await Routine.create({
      name,
      rest_bt_exercises,
      rest_bt_series,
      UserId
    });

    if (daysIds?.length > 0) {
      await routine.addDays(daysIds);
    }

    for (const re of routineExercises) {
      console.log(re)
      await RoutineExercise.create({
        routineId: routine.id,
        exerciseId: re.exerciseId,
        series: re.series,
        reps: re.reps
      });
    }

    return routine;
  };

  updateRoutine = async (id, { name, rest_bt_exercises, rest_bt_series, daysIds, routineExercises }) => {
    const routine = await Routine.findByPk(id);

    if (!routine) {
      throw new Error("Routine not found");
    }

    routine.name = name ?? routine.name;
    routine.rest_bt_exercises = rest_bt_exercises ?? routine.rest_bt_exercises;
    routine.rest_bt_series = rest_bt_series ?? routine.rest_bt_series;
    await routine.save();

    if (daysIds?.length >= 0) {
      await routine.setDays(daysIds);
    }

    await RoutineExercise.destroy({ where: { routineId: id } });

    for (const re of routineExercises) {
      await RoutineExercise.create({
        routineId: id,
        exerciseId: re.exerciseId,
        series: re.series,
        reps: re.reps
      });
    }

    return routine;
  };

  deleteRoutine = async (id) => {
    const routine = await Routine.findByPk(id);

    if (!routine) {
      throw new Error("Routine not found");
    }

    await RoutineExercise.destroy({
      where: { routineId: id }
    });

    await routine.setDays([]);

    await routine.destroy();

    return { message: "Routine deleted successfully" };
  };
}

export default RoutineService;

//EJEMPLO DE REQ ESPERADO PARA CREATE/UPDATE:
// {
//   "name": "Pull day",
//   "rest_bt_exercises": 180,
//   "rest_bt_series": 120,
//   "daysIds": [1, 3],
//   "UserId" : 1,
//   "routineExercises": [
//     {
//       "exerciseId": 2,
//       "series": 5,
//       "reps": 10
//     },
//     {
//       "exerciseId": 2,
//       "series": 5,
//       "reps": 10
//     }
//   ]
// }