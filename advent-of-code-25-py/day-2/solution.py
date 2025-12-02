import os
import time

start_time = time.time()


def read(filename="../../inputs/day-2/input.txt"):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, filename)
    with open(file_path, "r") as f:
        return f.read()


def is_invalid(id):
    mostSub = len(id) // 2
    for i in range(1, mostSub + 1):
        res = is_invalid_pow(id, i)
        if res:
            return res
    return 0


def is_invalid_pow(id, pow):
    if len(id) % pow != 0:
        return False
    occ = len(id) // pow
    sub = id[:pow]
    claimed = ""
    for i in range(1, occ+1):
        claimed += sub
    return int(id) if claimed == id else 0


invalid_sums = {}


def find_invalids_in_range(firstId, lastId):
    ctr = 0
    sum = 0
    for id in range(firstId, lastId + 1):
        if (invalid_sums.get(id)):
            continue
        invalidId = is_invalid(str(id))
        invalid_sums[invalidId] = True
        sum += invalidId
    return sum


ranges = read().split(",")
ctr = 0

for r in ranges:
    ctr += find_invalids_in_range(int(r.split("-")[0]), int(r.split("-")[1]))

print(f"{ctr}")
print(f"Execution time: {time.time() - start_time} seconds")
