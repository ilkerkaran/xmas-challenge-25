import os
import time
start_time = time.time()



def read(filename="../../inputs/day-5/input.txt"):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, filename)
    with open(file_path, "r") as f:
        return f.read()
    

lines = read().splitlines()
ranges = []
ids_to_check = []
for line in lines:
  if line.strip() == "":
    current_index = lines.index(line)
    ids_to_check.extend(lines[current_index + 1:])
    break
  start, end = map(int, line.split("-"))
  ranges.append((start, end))


ans2 = 0
i = 0
merged_range_indexes = []
while i < len(ranges):
  range_to_check = ranges[i]
  j = i + 1
  while j < len(ranges):
    next_range = ranges[j]
    if range_to_check[1] >= next_range[0] and range_to_check[1] <= next_range[1]:
      next_range_list = list(next_range)
      next_range_list[0] = min(range_to_check[0], next_range[0])
      ranges[j] = tuple(next_range_list)
      merged_range_indexes.append(i)
    elif range_to_check[0] >= next_range[0] and range_to_check[0] <= next_range[1]:
      next_range_list = list(next_range)
      next_range_list[1] = max(range_to_check[1], next_range[1])
      ranges[j] = tuple(next_range_list)
      merged_range_indexes.append(i)
    elif range_to_check[0] <= next_range[0] and range_to_check[1] >= next_range[1]:
      next_range_list = list(next_range)
      next_range_list[0] = range_to_check[0]
      next_range_list[1] = range_to_check[1]
      ranges[j] = tuple(next_range_list)
      merged_range_indexes.append(i)
    j+=1
  i += 1


# Filter out ranges whose indexes are in merged_range_indexes
filtered_ranges = [r for idx, r in enumerate(ranges) if idx not in merged_range_indexes]

for r in filtered_ranges:
  ans2 += r[1] - r[0] + 1

ans1 = 0
for id in ids_to_check:
  id_num = int(id)
  found = False
  for r in filtered_ranges:
    if r[0] <= id_num <= r[1]:
      found = True
      break
  if found:
    ans1 += 1



print(f"Ans1: {ans1}")
print(f"Ans2: {ans2}")
print(f"Execution time: {(time.time() - start_time) * 1000:.4f} ms")
