import { Day, Exercise, Routine, RoutineExercise } from "../models/index.js";

class RoutineService {
  getAllRoutines = async () => {
    const routines = await Routine.findAll({
      include: [
        {
          model: Day,
          attributes: ['name'],
          through: { attributes: [] }
        },
        {
          model: RoutineExercise,
          include: [
            {
              //ERROR ACÁ
              //VER XQ ESTO ESTA DEVOLVIENDO NULL
              model: Exercise,
              attributes: ['id', 'name']
            }
          ],
          attributes: ['id', 'series', 'reps']
        }
      ],
      order: [['id', 'ASC']]
    });
    return routines;
  };

  getRoutineById = async (id) => {
    const routine = await Routine.findByPk(id,{
      include: [
        {
          model: Day,
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
      order: [['id', 'ASC']]
    });

    return routine;
  };

  createRoutine = async ({ name, rest_bt_exercises, rest_bt_series, daysIds, routineExercises }) => {
    const routine = await Routine.create({
      name,
      rest_bt_exercises,
      rest_bt_series
    });

    // Asociar días a la rutina
    if (daysIds?.length > 0) {
      await routine.addDays(daysIds);
    }

    // Crear registros en RoutineExercise
    for (const re of routineExercises) {
      console.log(re)
      await RoutineExercise.create({
        RoutineId: routine.id,
        ExerciseId: re.exerciseId,
        series: re.series,
        reps: re.reps
      });
    }

    return routine;
  };



  updateRoutine = async (id, data) => {
    // const routine = await Routine.findByPk(id);
    // if (!routine) throw new Error("Ejercicio no encontrado");

    // const { name, musclesIds, movementId} = data;

    // await routine.update({ name });

    // if (musclesIds) {
    //   await routine.setMuscles(musclesIds);
    // }
    // if (movementId) {
    //   await routine.setMovement(movementId);
    // }
    // return routine;
  };

  deleteRoutine = async (id) => {
    // const routine = await Routine.findByPk(id);

    // if (!routine) return null;

    // await routine.destroy();

    // return true;
  };

}

export default RoutineService;
