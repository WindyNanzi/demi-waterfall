import { customAlphabet } from 'nanoid/non-secure'

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 5)

/**
 * 移除兑现
 * @param obj
 * @returns
 */
export const removeInvalidProps = (obj: Record<string, any>) => {
  const tempObj = { ...obj }
  Object.keys(tempObj).forEach((key): void => {
    if (tempObj[key] === undefined || tempObj[key] === null)
      Reflect.deleteProperty(tempObj, key)
  })
  return tempObj
}
